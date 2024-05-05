import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import NasaPhoto from "./NasaPhoto";

// Mocking the useDispatch function
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("NasaPhoto Component", () => {
  test("renders without crashing", async () => {
    render(<NasaPhoto />);
    await waitFor(() => {
      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
  });

  test("displays photo and information", async () => {
    const mockData = {
      title: "Test Photo",
      date: "2024-05-05",
      explanation: "This is a test photo",
      media_type: "image",
      url: "https://example.com/test.jpg",
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(<NasaPhoto />);

    await waitFor(() => {
      expect(screen.getByAltText(mockData.title)).toBeInTheDocument();
      expect(screen.getByText(mockData.title)).toBeInTheDocument();
      expect(screen.getByText(mockData.date)).toBeInTheDocument();
      expect(screen.getByText(mockData.explanation)).toBeInTheDocument();
    });
  });
});
