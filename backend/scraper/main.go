package main

import (
	"fmt"
	"time"

	"github.com/gocolly/colly/v2"
)

func main () {
	c := colly.NewCollector(
		//スクレイピング対象のサイト
		colly.AllowedDomains("www.navitime.co.jp"),
		colly.UserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"),
	)

	c.Limit(&colly.LimitRule{
		// domain global
		DomainGlob: "*navitime.co.jp*",
		// 同時接続
		Parallelism: 1,
		// 1 ~ 2 秒のランダム遅延
		RandomDelay: 2 * time.Second,
	})

	c.OnHTML("li.spot-section", func(e *colly.HTMLElement){
		name := e.ChildText("span.spot-name-text")
		
		fmt.Printf("店名: %s\n", name)
	})

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("訪問中:", r.URL.String())
	})
	c.Visit("https://www.navitime.co.jp/category/0301/")
}