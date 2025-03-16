.PHONY: all build-run build frontend backend run clean

CLIENT_DIR = ./client
CMD_DIR = ./cmd/web
OUTPUT_DIR = ./serve

all: run

frontend:
	cd ${CLIENT_DIR} && yarn && yarn build

backend:
ifeq ($(OS),Windows_NT)
	go build -o ${OUTPUT_DIR}.exe ${CMD_DIR}
else
	go build -o ${OUTPUT_DIR} ${CMD_DIR}
endif

build: frontend backend

run: frontend
	go run ${CMD_DIR}

clean:
	cd ${CLIENT_DIR} && yarn clean || true
	rm -f ${OUTPUT_DIR}

build-run: build
ifeq ($(OS),Windows_NT)
	./${OUTPUT_DIR}.exe
else
	./$(OUTPUT_DIR)
endif
