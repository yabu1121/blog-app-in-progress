# --- Build Stage ---
FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# 高速化のため、CGOを無効にしてバイナリをビルド
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# --- Run Stage ---
FROM alpine:latest
RUN apk add --no-cache tzdata
WORKDIR /app
# ビルドしたバイナリだけをコピー（イメージサイズを最小化し、起動を速くする）
COPY --from=builder /app/main .

EXPOSE 8080
CMD ["./main"]