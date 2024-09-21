import { render } from "@testing-library/react"
import Task from "../Task"
import { MemoryRouter } from "react-router-dom"

const testTask = {
    id: "1",
    name: "testTask 1",
    projectId: "1"
}

it("should render without crashing", () => {
    render(
        <MemoryRouter>
            <Task task={testTask} />
        </MemoryRouter>
    )
})

it("should match snapshot", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Task task={testTask} />
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})