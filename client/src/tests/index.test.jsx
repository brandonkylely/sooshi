// Integration tests
import { expect, test, vi } from "vitest";
import { MemoryRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../pages/HomePage";
import FeedPage from "../pages/FeedPage";


const mockInitTE = vi.fn();
const mockInput = vi.fn();
const mockCollapse = vi.fn();
const mockRipple = vi.fn();

vi.mock("tw-elements", async () => {
  const actual = await vi.importActual("tw-elements")
  return {
    ...actual,
    initTE: () => mockInitTE,
    Input: () => mockInput,
    Collapse: () => mockCollapse,
    Ripple: () => mockRipple,
  }
})

// function toJson(component) {
//   const result = component.toJSON();
//   expect(result).toBeDefined();
//   expect(result).not.toBeInstanceOf(Array);
//   return result;
// }

test("Testing Library Works", () => {
  expect(true).toBe(true);
});

test("Home Page Unit Test", async () => {
  render(
  <Router>
    <HomePage />
  </Router>);

  const titleElement = screen.getByTestId("sooshi-title");
  expect(titleElement).toBeInTheDocument();

  const captionElement = screen.getByTestId("title-caption");
  expect(captionElement).toBeInTheDocument();

  const registerElement = screen.getByTestId("register-home");
  expect(registerElement).toBeInTheDocument();

  const loginElement = screen.getByTestId("login-home");
  expect(loginElement).toBeInTheDocument();
});

test('Feed Page Unit Test', async () => {
  render(
  <Router>
    <FeedPage />
  </Router>);

  const loadingElement = screen.getByTestId("loading");
  expect(loadingElement).toBeInTheDocument();
})

// test('Feed Page Integration Test', async () => {
//   render(
//   <Router>
//     <FeedPage />
//   </Router>);
// })
