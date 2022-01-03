##### Passo 1 #####

### Usando golang:1.16-alpine como base para construir a imagem da aplicação
FROM golang:1.16-alpine as builder
### Cria um novo diretório e adiciona como ambiente de trabalho
RUN mkdir -p /app
WORKDIR /app
### Copia as dependências
COPY go.mod .
### faz download com proxy
ENV GOPROXY https://proxy.golang.org,direct
### download das dependências
RUN go mod download
### Copia o código atual para construir a aplicação
COPY . .
###  CGO desabilita o cross plataforma
ENV CGO_ENABLED=0
### Constrói a aplicação hello Go para linux OS
### 'scratch' and 'alpine' ambas são distribuições linux
RUN GOOS=linux go build ./hello.go


##### Passo 2 #####
FROM scratch

### Ambiente de trabalho
WORKDIR /app
### Copia o binário da imagem builder para app
COPY --from=builder /app/app .
### Roda o binário da aplicação
CMD ["/app/app"]