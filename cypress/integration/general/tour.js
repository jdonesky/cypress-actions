describe("make sure site loads", () => {
  beforeEach(() => {
    const API_KEY = Cypress.env("REACT_APP_MOVIE_API");
    const configUrl =
      "https://api.themoviedb.org/3/configuration?api_key=" + API_KEY;
    const moviesListUrl =
      "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&api_key=" +
      API_KEY;
    cy.intercept(configUrl, { fixture: "config" });
    cy.intercept(moviesListUrl, { fixture: "moviesList" });
    cy.visit("http://localhost:3000/");
  });

  it("Page loads", () => {
    cy.findAllByTestId("movies-list-item")
      .first()
      .then(($movie) => {
        const movieUrl = $movie.attr("href");
        cy.get("[data-testid=movies-list-item]").first().click();
        cy.url().should("include", movieUrl);
      });
  });

  it("shows correct number of movies", () => {
    cy.get("[data-testid=movies-list-item]").should("have.length", 20);
  });

  it("understands chainers", () => {
    cy.get("[data-testid=movies-list-item]").should("not.exist");
    cy.get("[data-testid=movies-loading-movie]").should("not.exist");

    cy.fixture("moviesList").then((jsonData) => {
      console.log(jsonData.results[0]);
      expect(jsonData.results[0].title).to.eq("Tom & Jerry");
    });
  });
});
