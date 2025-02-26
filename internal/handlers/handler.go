package handlers

import "github.com/itsNavinSingh/erp/internal/config"

var Repo *Repository

type Repository struct {
	App *config.AppConfig
}

//NewRepo: Creates the Repository instance with config data
func NewRepo(a *config.AppConfig) *Repository {
	return &Repository{
		App: a,
	}
}

// NewHandlers: Assign Repository instance to Repo global variable for further use
func NewHandlers(r *Repository) {
	Repo = r
}