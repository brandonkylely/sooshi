// Integration tests
import { afterEach, expect, test, vi } from "vitest";
import { MemoryRouter as Router } from "react-router-dom";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../pages/HomePage";
import FeedPage from "../pages/FeedPage";
import PostPage from "../pages/PostPage";
import axios from "axios";

afterEach(() => {
  cleanup();
});

// Mocking tw-elements
const mockInitTE = vi.fn();
const mockInput = vi.fn();
const mockCollapse = vi.fn();
const mockRipple = vi.fn();

vi.mock("tw-elements", async () => {
  const actual = await vi.importActual("tw-elements");
  return {
    ...actual,
    initTE: () => mockInitTE,
    Input: () => mockInput,
    Collapse: () => mockCollapse,
    Ripple: () => mockRipple,
  };
});

// function toJson(component) {
//   const result = component.toJSON();
//   expect(result).toBeDefined();
//   expect(result).not.toBeInstanceOf(Array);
//   return result;
// }

test("Testing Library Works", () => {
  expect(true).toBe(true);
});

function standardExpects() {
  const navbarElement = screen.getByTestId("navbar");
  expect(navbarElement).toBeInTheDocument();

  const footerElement = screen.getByTestId("footer");
  expect(footerElement).toBeInTheDocument();
}

test("Home Page Unit Test", () => {
  render(
    <Router>
      <HomePage />
    </Router>
  );

  standardExpects();

  const titleElement = screen.getByTestId("sooshi-title");
  expect(titleElement).toBeInTheDocument();

  const captionElement = screen.getByTestId("title-caption");
  expect(captionElement).toBeInTheDocument();

  const registerElement = screen.getByTestId("register-home");
  expect(registerElement).toBeInTheDocument();

  const loginElement = screen.getByTestId("login-home");
  expect(loginElement).toBeInTheDocument();
});

test("Feed Page Unit Test", () => {
  render(
    <Router>
      <FeedPage />
    </Router>
  );

  standardExpects();

  const loadingElement = screen.getByTestId("loading");
  expect(loadingElement).toBeInTheDocument();
});

test("Post Page Unit Test", () => {
  render(
    <Router>
      <PostPage />
    </Router>
  );

  standardExpects();

  const formElement = screen.getByTestId("post-form");
  expect(formElement).toBeInTheDocument();

  const titleElement = screen.getByTestId("post-page-title");
  expect(titleElement).toBeInTheDocument();

  const goToFeedElement = screen.getByTestId("go-to-feed-button");
  expect(goToFeedElement).toBeInTheDocument();
});

test("Feed Page Loads Sushi Cards", async () => {
  vi.mock("axios");

  const sushiDataMock = {
    data: {
      sushiData: [
        {
          image: "image_name1.jpg",
          userId: "user_id_placeholder",
          status: "active",
          timestamp: "2023-09-19T22:42:45.946Z",
          id: "id_placeholder",
          title: "Image 1",
          signedURL: "https://picsum.photos/600/450",
        },
        {
          image: "image_name2.jpg",
          userId: "user_id_placeholder",
          status: "active",
          timestamp: "2023-09-19T22:04:51.845Z",
          id: "id_placeholder",
          title: "Image 2",
          signedURL: "https://picsum.photos/600/450",
        },
      ],
      lastKey: {
        id: "last_key_placeholder",
        status: "active",
        timestamp: 1695161091845,
      },
    },
  };

  const urlDataMock = "https://picsum.photos/600/450";

  axios.get
    .mockResolvedValue(urlDataMock)
    .mockResolvedValueOnce(sushiDataMock)
    .mockResolvedValueOnce(sushiDataMock);

  render(
    <Router>
      <FeedPage />
    </Router>
  );

  await waitFor(() => {
    const sushiCardElement = screen.getByTestId("sushi-card");
    expect(sushiCardElement).toBeInTheDocument();
  });
});

// test('Feed Page Integration Test', async () => {
//   render(
//   <Router>
//     <FeedPage />
//   </Router>);
// })
