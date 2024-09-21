import { render } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import NewTaskForm from "../NewTaskForm"
import userEvent from "@testing-library/user-event"

vi.mock("../../../api");

it("Should render without crashing", () => {
    render(
        <MemoryRouter>
            <NewTaskForm />
        </MemoryRouter>
    )
})

it("Should match snapshot", () => {
    const { asFragment, getByText } = render(
        <MemoryRouter>
            <NewTaskForm />
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
                useNavigate: vi.fn(() => `redirected`)
            };
        })

        const { getByLabelText, getByText } = render(
            <MemoryRouter>
                <NewTaskForm />
            </MemoryRouter>
        );

        const submitBtn = getByText("Submit");

        const nameInput = getByLabelText("name");

        await user.type(nameInput, "testName");
        await user.click(submitBtn);
        expect(useNavigate).toHaveBeenCalled();
    })