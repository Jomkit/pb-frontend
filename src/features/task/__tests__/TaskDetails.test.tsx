import { render } from "@testing-library/react"
import TaskDetails from "../TaskDetails"
import { MemoryRouter } from "react-router-dom";
import alertContext from "../../../components/contexts/alertContext";
import userEvent from "@testing-library/user-event";
import Api from "../../../api";

const mockedSetAlertMessage = vi.fn();
const mockedSetAlertOn = vi.fn();

beforeEach(() => {
    vi.mock("../../../api");
    vi.mock("react-router-dom", async (importOriginal) => {
        const mod = await importOriginal<typeof import("react-router-dom")>();
        return {
            ...mod,
            useLocation: () => ({state: {id: "1", name: "testTask 1", projectId: "1"}}),
        }
    })
})
afterEach(() => {
    vi.restoreAllMocks();
})

it("should render without crashing", () => {
    render(
        <MemoryRouter>
            <alertContext.Provider value={{setAlertMessage: mockedSetAlertMessage, setAlertOn: mockedSetAlertOn}} >
                <TaskDetails />
            </alertContext.Provider>
        </MemoryRouter>
    );
})

it("should match snapshot", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <alertContext.Provider value={{setAlertMessage: mockedSetAlertMessage, setAlertOn: mockedSetAlertOn}} >
                <TaskDetails />
            </alertContext.Provider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})

it("should call Api.deleteTask when delete button pressed", async () => {
    const deleteTaskRef = vi.spyOn(Api, "deleteTask");
    const user = userEvent.setup();
    
    const { findByText } = render(
        <MemoryRouter>
            <alertContext.Provider value={{setAlertMessage: mockedSetAlertMessage, setAlertOn: mockedSetAlertOn}} >
                <TaskDetails />
            </alertContext.Provider>
        </MemoryRouter>
    );
    const deleteBtn = await findByText("Delete");
    expect(deleteBtn).toBeInTheDocument();

    await user.click(deleteBtn);
    expect(deleteTaskRef).toHaveBeenCalled();
    expect(deleteTaskRef).toHaveBeenCalledWith("1", "1");
})

it("should disable delete button after it is pressed", async () => {
    const deleteTaskRef = vi.spyOn(Api, "deleteTask");
    const user = userEvent.setup();
    
    const { findByText } = render(
        <MemoryRouter>
            <alertContext.Provider value={{setAlertMessage: mockedSetAlertMessage, setAlertOn: mockedSetAlertOn}} >
                <TaskDetails />
            </alertContext.Provider>
        </MemoryRouter>
    );
    const deleteBtn = await findByText("Delete");
    expect(deleteBtn).toBeInTheDocument();

    expect(deleteBtn).not.toBeDisabled();
    await user.tripleClick(deleteBtn);
    expect(deleteBtn).toBeDisabled();
    expect(deleteTaskRef).toHaveBeenCalled();
    expect(deleteTaskRef).toHaveBeenCalledWith("1", "1");
})