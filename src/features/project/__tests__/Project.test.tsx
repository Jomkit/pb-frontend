import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Project from "../Project"

it('should render without crashing', () => { 
    const testProject = {
        id: "1",
        name: "testProject",
        note: "testNote"
    }
    render(
        <MemoryRouter>
            <Project project={testProject} />
        </MemoryRouter>
    )
})
it("should match snapshot", () => {
    const testProject = {
        id: "1",
        name: "testProject",
        note: "testNote"
    }
    const { asFragment } = render(
        <MemoryRouter>
            <Project project={testProject} />
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})