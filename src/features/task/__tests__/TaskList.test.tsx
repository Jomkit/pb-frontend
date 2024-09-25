import { render } from "@testing-library/react"
import TaskList from "../TaskList"
import userContext from "../../../components/contexts/userContext";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const testTasks = [
    {
        id: "1",
        name: "testTask 1",
        projectId: "1"
    },
    {
        id: "2",
        name: "testTask 2",
        projectId: "1"
    },
    {
        id: "3",
        name: "testTask 3",
        projectId: "1"
    }
]

const testProjects = [
    {
        id: "1",
        name: "testProject 1",
        note: "testNote"
    },
    {
        id: "2",
        name: "testProject 2",
        note: "testNote"
    },
    {
        id: "3",
        name: "testProject 3",
        note: "testNote"
    }
]

const testUser = {
    id: 1,
    username: "testUser",
    firstName: "test",
    lastName: "test",
    email: "test@email.com"
}

let loading = true;

afterEach(() => {
    loading = true;
})

it("should render without crashing", () => {
    render(<TaskList loading={loading} projects={[]} tasks={testTasks} />);
})

it("should match snapshot of loading view", () => {
    const { asFragment } = render(<TaskList loading={loading} projects={testProjects} tasks={testTasks} />);
    expect(asFragment()).toMatchSnapshot();
})

it("should match snapshot of loading complete", async () => {
    loading = false;
    const { asFragment, findAllByText } = render(
        <MemoryRouter>
            <userContext.Provider value={testUser}>
            <TaskList loading={loading} projects={testProjects} tasks={testTasks} />
            </userContext.Provider>

        </MemoryRouter>
    );

    const allTestTasks = await findAllByText("testTask", { exact: false });
    expect(allTestTasks.length).toBe(3);
    expect(asFragment()).toMatchSnapshot();
})

it("should bring up popup on clicking New Task button", async () => {
    loading = false;
    const user = userEvent.setup();
    const { findByText } = render(
        <MemoryRouter>
            <userContext.Provider value={testUser}>
            <TaskList loading={loading} projects={testProjects} tasks={testTasks} />
            </userContext.Provider>
        </MemoryRouter>
    );
        
    const newTaskBtn = await findByText("New Task");
    expect(newTaskBtn).toBeInTheDocument();

    await user.click(newTaskBtn);
    const formTitle = await findByText("Create New Task");
    expect(formTitle).toBeInTheDocument();

    const closeButton = await findByText("✕");
    expect(closeButton).toBeInTheDocument();
})

it("should close popup on clicking close button", async () => {
    loading = false;
    const user = userEvent.setup();
    const { findByText } = render(
        <MemoryRouter>
            <userContext.Provider value={testUser}>
            <TaskList loading={loading} projects={testProjects} tasks={testTasks} />
            </userContext.Provider>
        </MemoryRouter>
    );
        
    const newTaskBtn = await findByText("New Task");
    expect(newTaskBtn).toBeInTheDocument();

    await user.click(newTaskBtn);
    const formTitle = await findByText("Create New Task");
    expect(formTitle).toBeInTheDocument();

    const closeButton = await findByText("✕");
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
    expect(formTitle).not.toBeInTheDocument();
})