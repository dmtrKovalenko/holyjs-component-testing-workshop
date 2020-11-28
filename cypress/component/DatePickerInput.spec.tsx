import * as React from "react";
import { mount } from "@cypress/react";
import DatePickerInput from "../../src/DatePickerInput";

describe("<DatePickerInput />", () => {
  it("renders datepicker", () => {
    mount(<DatePickerInput />);
    cy.get("[aria-label='Choose date']").click();
    cy.contains("November");
  });

  it("selects date in new month", () => {
    mount(<DatePickerInput />);
    cy.get("[aria-label='Choose date']").click();
    cy.get("[aria-label='next month']").click();

    cy.get("[aria-label='Dec 31, 2020']").click();
    cy.get("input").should("have.value", "12/431/2020");
  });

  context("Keyboard navigation", () => {
    beforeEach(() => {
      mount(<DatePickerInput />);
      cy.get("[aria-label='Choose date']").click();
    });

    it("ArrowLeft", () => {
      cy.realType("{leftarrow}{enter}");
      cy.get("input").should("have.value", "11/27/2020");
    });

    it("Keyboard navigation", () => {
       cy.realPress("{leftarrow}");
       cy.realPress("Tab")
       cy.realPress("Tab")
       cy.realPress("Tab")
       cy.realPress("Tab")
       cy.realPress(" ")
       cy.realPress("Tab")
      
       cy.focused().should("have.attr", 'aria-label', 'Dec 27, 2020')
    })
  });
});
