import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Projects from "../Projects"

it("should render without crashing", () => {
    render(
        <MemoryRouter>
            <Projects />
        </MemoryRouter>
    )
})

it("should match snapshot while loading projects", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Projects />
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})

it("should match snapshot after loading complete", async () => {
    const { asFragment, findByText } = render(
        <MemoryRouter>
            <Projects />
        </MemoryRouter>
    )
    setTimeout(async () => {
        let testProjectText = await findByText("testProject 1");
        expect(testProjectText).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    }, 200);
})