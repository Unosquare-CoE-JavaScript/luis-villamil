import { expect } from "@jest/globals";
import { findByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../context/OrderDetails";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoop changes", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // make sure total start out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings changes", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // add topping and check total
  const cherrieBox = await screen.findByRole("checkbox", { name: "Cherries" });
  userEvent.click(cherrieBox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // add another topping and check total
  const hotFudgeBox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  userEvent.click(hotFudgeBox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // uncheck topping and check total
  userEvent.click(cherrieBox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />, {
      wrapper: OrderDetailsProvider,
    });

    const grandTotal = screen.getByText("Grand total: $", {
      exact: false,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const cherrieBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherrieBox);

    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />, {
      wrapper: OrderDetailsProvider,
    });

    const cherrieBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherrieBox);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const grandTotal = screen.getByText("Grand total: $", {
      exact: false,
    });
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />, {
      wrapper: OrderDetailsProvider,
    });

    const cherrieBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherrieBox);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const grandTotal = screen.getByText("Grand total: $", {
      exact: false,
    });
    expect(grandTotal).toHaveTextContent("3.50");

    userEvent.click(cherrieBox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
