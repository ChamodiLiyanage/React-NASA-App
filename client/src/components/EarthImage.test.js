import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import EarthImage from "./EarthImage";

// Mocking the useDispatch function
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("EarthImage Component", () => {
  test("renders without crashing", async () => {
    render(<EarthImage />);
    await waitFor(() => {
      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
  });

  test("displays earth imagery and information", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      blob: jest.fn().mockResolvedValueOnce(new Blob()),
    });

    render(<EarthImage />);

    await waitFor(() => {
      expect(screen.getByAltText("Earth Imagery")).toBeInTheDocument();
      expect(screen.getByText("Earth Imagery")).toBeInTheDocument();
      expect(screen.getByText("2014-02-01")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Earth imagery encompasses a wide array of visual representations capturing the Earth's surface from various imaging platforms/i
        )
      ).toBeInTheDocument();
    });
  });
});
