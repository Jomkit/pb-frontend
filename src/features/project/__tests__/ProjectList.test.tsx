import { render, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import ProjectList from "../ProjectList"
import userEvent from "@testing-library/user-event"

const testProjects = [
    {
        id: "1",
        name: "testProject 1",
        note: "testNote 1"
    },
    {
        id: "2",
        name: "testProject 2",
        note: "testNote 2"
    },
    {
        id: "3",
        name: "testProject 3",
        note: "testNote 3"
    }
]

it("should render without crashing", () => {
    render(
        <MemoryRouter>
            <ProjectList projects={testProjects} />
        </MemoryRouter>
    )
})

it("should match snapshot", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <ProjectList projects={testProjects} />
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})

it("should open popup on click", async () => {
    const user = userEvent.setup();
    const { getByText, findByText } = render(
        <MemoryRouter>
            <ProjectList projects={testProjects} />
        </MemoryRouter>
    )
    const newProjectBtn = getByText("New Project");
    await user.click(newProjectBtn);
    
    await waitFor(async () => {
        const formTitle = await findByText("Create New Project");
        expect(formTitle).toBeInTheDocument();
    })
})

it("should close popup on click", async () => {
    const user = userEvent.setup();
    const { getByText, findByText } = render(
        <MemoryRouter>
            <ProjectList projects={testProjects} />
        </MemoryRouter>
    )
    const newProjectBtn = getByText("New Project");
    await user.click(newProjectBtn);
    
    const formTitle = await findByText("Create New Project");
    expect(formTitle).toBeInTheDocument();

    const closeButton = await findByText("✕");
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);

    expect(formTitle).not.toBeInTheDocument();
})