import { render, waitFor } from "@testing-library/react";
import Signup from "../Signup";
import { ReactNode } from "react";
import userEvent from "@testing-library/user-event";

describe("signup", function() {
    function setup(tsx: ReactNode) {
        return {
            user: userEvent.setup(),
            ...render(tsx)
        }
    }

    const mockSignup = vi.fn();

    it('should render without crashing', () => { 
        render(<Signup signup={mockSignup} />);
    })

    it('should match snapshot', () => { 
        const { asFragment } = render(
            <Signup signup={mockSignup} />
        )

        expect(asFragment()).toMatchSnapshot();
    })

    it('should call signup', async () => { 
        const { user, getByRole, getByLabelText } = setup(
            <Signup signup={mockSignup} />
        )

        const usernameField = getByLabelText("username");
        const passwordField = getByLabelText("password");
        const firstNameField = getByLabelText("firstName");
        const lastNameField = getByLabelText("lastName");
        const emailField = getByLabelText("email");
        await user.type(usernameField, "testUsername");
        await user.type(passwordField, "testPassword");
        await user.type(firstNameField, "testFirstName");
        await user.type(lastNameField, "testLastName");
        await user.type(emailField, "testEmail@email.com");

        const submitBtn = getByRole('button', {name: /Submit/i});
        user.click(submitBtn);
        await waitFor(() => {
            expect(mockSignup).toHaveBeenCalledWith({
                username: "testUsername", 
                password: "testPassword",
                firstName: "testFirstName", 
                lastName: "testLastName", 
                email: "testEmail@email.com"
            });
            expect(mockSignup).toHaveBeenCalled();
        })
    })

    it("Should not call signup if email is wrong format", async () => {
        const { user, getByRole, findByLabelText } = setup(
            <Signup signup={mockSignup} />
        )

        const usernameField = await findByLabelText("username");
        const passwordField = await findByLabelText("password");
        const firstNameField = await findByLabelText("firstName"); 
        const lastNameField = await findByLabelText("lastName");
        const emailField = await findByLabelText("email");
        await user.type(usernameField, "testUsername");
        await user.type(passwordField, "testPassword");
        await user.type(firstNameField, "testFirstName");
        await user.type(lastNameField, "testLastName");
        await user.type(emailField, "banana[Tab]");

        const submitBtn = getByRole("button", {name: /submit/i});
        try{
            user.click(submitBtn);
        } catch(err: any){
            expect(err.message).toBe("Invalid email format");
        }

    })
})