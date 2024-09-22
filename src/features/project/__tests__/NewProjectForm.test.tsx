import { render } from "@testing-library/react"
import NewProjectForm from "../NewProjectForm"
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";

vi.mock("../../../api");
it('should render without crashing', () => { 
    render(
        <MemoryRouter>
            <NewProjectForm />
        </MemoryRouter>
    );
})

it('should match snapshot', () => { 
    const { asFragment } = render(
        <MemoryRouter>
            <NewProjectForm />
        </MemoryRouter>
    )
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

    const { getByLabelText, getByText } = render(
        <MemoryRouter>
            <NewProjectForm />
        </MemoryRouter>
    );

    const submitBtn = getByText("Submit");

    const nameInput = getByLabelText("name");
    const noteInput = getByLabelText("note");

    await user.type(nameInput, "testProject");
    await user.type(noteInput, "testNote");
    await user.click(submitBtn);
    expect(useNavigate).toHaveBeenCalled();
})