import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import ProjectDetails from "../ProjectDetails"

vi.mock("../../../api");

it("should render without crashing", () => {
    render(
        <MemoryRouter initialEntries={["/projects/1"]}>
            <ProjectDetails />
        </MemoryRouter>
    )
})


it("should match snapshot of loading", () => {
    const { asFragment } = render(
        <MemoryRouter initialEntries={["/projects/1"]}>
            <ProjectDetails />
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})  

it("should match snapshot after loading complete", async () => {
    const { asFragment, findAllByText } = render(
        <MemoryRouter initialEntries={["/projects/1"]}>
            <ProjectDetails />
        </MemoryRouter>
    )

    const allTestTasks = await findAllByText("testTask", { exact: false });
    expect(allTestTasks[0]).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
})
