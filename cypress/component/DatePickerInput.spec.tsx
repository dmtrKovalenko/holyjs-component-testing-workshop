import * as React from "react";
import { mount } from "@cypress/react";
import { DatePickerInput } from "../../src/DatePickerInput";

describe("<DatePickerInput />", () => {
  it("renders DatePickerInput", () => {
    mount(<DatePickerInput />);

    cy.get("[aria-label='Choose date']").click();
    cy.contains("November");
  });

  it("selects a date", () => {
    mount(<DatePickerInput />);

    cy.get("[aria-label='Choose date']").click();
    cy.get("[aria-label='Nov 9, 2020']").click();

    cy.get("input").should("have.value", "11/09/2020");
  });

  it("selects date in hte next month", () => {
    mount(<DatePickerInput />);
    cy.get("[aria-label='Choose date']").click();

    cy.get('[aria-label="next month"]').click();
    cy.get("[aria-label='Dec 12, 2020']").click();

    cy.get("input").should("have.value", "12/12/2020");
  });

  context("keyboard navigation", () => {
    beforeEach(() => {
      mount(<DatePickerInput />);
      cy.get("[aria-label='Choose date']").click();
    });

    it("ArrowUp", () => {
      cy.realPress("{uparrow}");
      cy.focused().should("have.attr", "aria-label", "Nov 21, 2020");
      cy.realPress("{enter}");

      cy.get("input").should("have.value", "11/21/2020");
    });

    it("ArrowLeft", () => {
      cy.realType("{leftarrow}{enter}");
      cy.get("input").should("have.value", "11/27/2020");
    });

    it("Tab navigation", () => {
      cy.realPress("{leftarrow}");
      cy.realPress("Tab");
      cy.realPress("Tab");
      cy.realPress("Tab");
      cy.realPress("Tab");
  
      cy.focused().should("have.attr", "aria-label", "next month");
      cy.realPress(" ")
      cy.realPress("Tab")

      cy.focused().should("have.attr", "aria-label", "Dec 27, 2020")
    });
  });
});
