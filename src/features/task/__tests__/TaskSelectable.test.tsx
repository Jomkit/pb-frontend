import { render } from "@testing-library/react";
import TaskSelectable from "../TaskSelectable";
import userContext from "../../../components/contexts/userContext";
import { MemoryRouter } from "react-router-dom";

const testUser = {
    id: 1,
    username: "testUser",
    firstName: "first",
    lastName: "last", 
    email: "test@email.com"
}

beforeEach(() => {
    vi.mock('../../../api');
    vi.mock('../../../components/hooks/useLocalStorage', () => ({
        default: () => ["1", vi.fn()]
    }));
})

afterEach(() => {
    vi.restoreAllMocks();
})

it("should render without crashing", () => {
    render(<TaskSelectable />);
})

it("should match snapshot loading view", () => {
    const { asFragment } = render(<TaskSelectable />);
    expect(asFragment()).toMatchSnapshot();
})

it("should match snapshot loaded view", async () => {
    const { asFragment, findByText } = render(
        <MemoryRouter>
            <userContext.Provider value={testUser}>
                <TaskSelectable />
            </userContext.Provider>
        </MemoryRouter>
    )

    const dropDownLabel = await findByText("tasks");
    expect(dropDownLabel).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
})

it("should have dropdown button and popup button", async () => {
    const { findByText } = render(
        <MemoryRouter>
            <userContext.Provider value={testUser}>
                <TaskSelectable />
            </userContext.Provider>
        </MemoryRouter>
    )
    const dropDownLabel = await findByText("tasks");
    const addTasksBtn = await findByText("New Task");
    expect (dropDownLabel).toBeInTheDocument();
    expect(addTasksBtn).toBeInTheDocument();
})