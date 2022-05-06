import { fireEvent, render, screen } from '@testing-library/react'
import SearchBox from './index'

describe("when rendered with a `submitSearch` prop", () => {
  it("should paste it into the input", () => {
    // const setSearchValueMock = jest.fn();
    render(
      <SearchBox 
        submitSearch="Hello" 
        // setSearchValue={setSearchValueMock}
      />
    ); 
    
    expect(screen.getByRole("textbox")).toBe("Hello")
  });
});


describe("when the button is pressed", () => {
  it("should call the `setSearchValue` callback", () => {
    const setSearchValueMock = jest.fn();
    render(
      <SearchBox 
        submitSearch="Test Name" 
        setSearchValue={setSearchValueMock} />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(setSearchValueMock).toHaveBeenCalledWith(
      "Test Name");
  });
});