package main

import (
	"encoding/csv"
	"fmt"
	"os"
	"time"

	"github.com/gocolly/colly/v2"
)

func main() {
	file, err := os.OpenFile("navitime_spots5.csv", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Printf("ファイルエラー: %v\n", err)
		return
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	fInfo, _ := file.Stat()
	if fInfo.Size() == 0 {
		writer.Write([]string{"店名", "郵便番号", "住所", "電話番号", "備考"})
		writer.Flush()
	}

	// 2. コレクターの設定
	c := colly.NewCollector(
		colly.AllowedDomains("www.navitime.co.jp"),
		colly.UserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"),
	)

	c.Limit(&colly.LimitRule{
		DomainGlob:  "*navitime.co.jp*",
		Parallelism: 1,
		RandomDelay: 2 * time.Second,
	})

	detailCollector := c.Clone()

	c.OnHTML("li.spot-section", func(e *colly.HTMLElement) {
		name := e.ChildText("span.spot-name-text")
		link := e.ChildAttr("a", "href")

		if link != "" {
			fullURL := e.Request.AbsoluteURL(link)
			ctx := colly.NewContext()
			ctx.Put("name", name)
			detailCollector.Request("GET", fullURL, nil, ctx, nil)
		}
	})

	detailCollector.OnHTML("body", func(e *colly.HTMLElement) {
		name := e.Response.Ctx.Get("name")
		var postal, address, tel, note string

		e.ForEach("dl", func(_ int, el *colly.HTMLElement) {
			dt := el.ChildText("dt")
			dd := el.ChildText("dd")
			switch dt {
			case "郵便番号": postal = dd
			case "住所": address = dd
			case "電話番号": tel = dd
			case "備考": note = dd
			}
		})

		writer.Write([]string{name, postal, address, tel, note})
		writer.Flush()
		fmt.Printf("[保存完了] %s\n", name)
	})

	for i := 41; i <= 50; i++ {
		targetURL := fmt.Sprintf("https://www.navitime.co.jp/category/0301/?page=%d", i)
		fmt.Printf("\n>>> ページ %d を処理中: %s\n", i, targetURL)
		
		c.Visit(targetURL)
		
		time.Sleep(3 * time.Second)
	}

	fmt.Println("\n全10ページの処理が完了しました。")
}