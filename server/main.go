package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
)

type Note struct {
	Id          int    `json:"id"`
	Title       string `json:"title"`
	Contetnt    string `json:"content"`
	DateCreated string `json:"dateCreated"`
	DateUpdated string `json:"dateUpdated"`
}

func main() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	notes := []Note{}

	app.Get("/check", func(ctx *fiber.Ctx) error {
		return ctx.SendString("OK")
	})

	app.Get("/notes", func(ctx *fiber.Ctx) error {
		return ctx.JSON(notes)
	})

	app.Post("/note", func(ctx *fiber.Ctx) error {
		note := Note{}
		if err := ctx.BodyParser(&note); err != nil {
			return err
		}
		note.Id = len(notes) + 1
		notes = append(notes, note)

		return ctx.JSON(notes)
	})

	if err := app.Listen(":4000"); err != nil {
		log.Fatalf("can`t stat cause: %s", err.Error())
	}
}
