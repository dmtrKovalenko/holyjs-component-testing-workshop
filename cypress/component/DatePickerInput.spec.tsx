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

  it.only("selects date in hte next month", () => {
    mount(<DatePickerInput />);
    cy.get("[aria-label='Choose date']").click();

    cy.get('[aria-label="next month"]').click();
    cy.get("[aria-label='Dec 12, 2020']").click();

    cy.get("input").should("have.value", "12/12/2020")
  });
});
