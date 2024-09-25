import { render } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import NewTaskForm from "../NewTaskForm"
import userEvent from "@testing-library/user-event"

import alertContext from "../../../components/contexts/alertContext";

vi.mock("../../../api");

const mockedClosePopup = vi.fn();
const mockedSetAlertMessage = vi.fn();
const mockedSetAlertOn = vi.fn();

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

it("Should render without crashing", () => {
    render(
        <MemoryRouter>
            <NewTaskForm closePopup={mockedClosePopup} projects={testProjects} />
        </MemoryRouter>
    )
})

it("Should match snapshot", () => {
    const { asFragment, getByText } = render(
        <MemoryRouter>
            <NewTaskForm closePopup={mockedClosePopup} projects={testProjects} />
        </MemoryRouter>
    )

    expect(getByText("Create New Task")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
})

    it("should redirect to same page when successfully submitting form", async () => {
        const user = userEvent.setup();
        vi.mock("react-router-dom", async (importOriginal) => {
            const mod = await importOriginal<typeof import("react-router-dom")>();
            return {
                ...mod,
                useNavigate: vi.fn(() => vi.fn())
            };
        })

        const { getByPlaceholderText, getByText, getByRole } = render(
            <MemoryRouter>
                <alertContext.Provider value={{setAlertMessage: mockedSetAlertMessage, setAlertOn: mockedSetAlertOn}} >
                    <NewTaskForm closePopup={mockedClosePopup} projects={testProjects} />
                </alertContext.Provider>
            </MemoryRouter>
        );

        const submitBtn = getByText("Submit");

        const projectSelect = getByRole("combobox", {name: "projectId"});
        const nameInput = getByPlaceholderText("Task Name");

        await user.selectOptions(projectSelect, ["1"]);
        await user.type(nameInput, "testName");
        await user.click(submitBtn);
        expect(useNavigate).toHaveBeenCalled();
        expect(mockedSetAlertOn).toHaveBeenCalled();
        expect(mockedSetAlertMessage).toHaveBeenCalled();
    })