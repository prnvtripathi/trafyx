# Start from the official Golang image
FROM golang:1.24.5-alpine AS builder

WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Build the Go app
RUN go build -o main .

# Start a new minimal image
FROM alpine:latest
WORKDIR /root/

# Copy the binary from the builder
COPY --from=builder /app/main .

# Expose the port
EXPOSE 8080

# Set environment variable for port
ENV PORT=8080

# Command to run
CMD ["./main"]
