describe("Task 4", () => {
  describe("Initial state", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3002");
    });

    it("should initial state be 0", () => {
      cy.get(".counts").should("have.text", "0");
    });
  });

  describe("Increment & decrement operations to initial state", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3002");
    });

    it("should have increment button", () => {
      cy.get(".increment").should("exist");
    });

    it("should have decrement button", () => {
      cy.get(".decrement").should("exist");
    });

    it("should increment counter", () => {
      cy.get(".increment").click();
      cy.get(".counts").should("have.text", "1");
    });

    it("should decrement counter", () => {
      cy.get(".decrement").click();
      cy.get(".counts").should("have.text", "-1");
    });
  });
});

describe("Input for initial state", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3002");
  });

  it("should update counter and initial start?", () => {
    const input = cy.get(".initialInput");
    input.type("99");

    const submitButton = cy.get("[type=submit]");
    submitButton.click();
    cy.get(".counts").should("have.text", "99");
  });
});

describe("Reset button", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3002");
  });

  it("should button be present", () => {
    cy.get(".reset").should("to.exist").should("have.text", "Reset");
  });

  it("should reset to 0 if no start value", () => {
    cy.get(".increment").click().click().click();
    cy.get(".reset").click();
    cy.get(".counts").should("have.text", "0");
  });

  it("should reset back to start value", () => {
    const input = cy.get(".initialInput");
    input.type("99");

    const submitButton = cy.get("[type=submit]");
    submitButton.click();

    cy.get(".increment").click().click().click();
    cy.get(".reset").click();
    cy.get(".counts").should("have.text", "99");
  });
});
