import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../Login";
import LoginForm from "../LoginForm";
import { ReactNode } from "react";

describe("Login", function() {
    const mockedLogin = vi.fn();

    function setup(tsx: ReactNode) {
        return {
            user: userEvent.setup(),
            ...render(tsx)
        }
    }
    
    it('should render without crashing', () => { 
        render(<Login>
            <LoginForm login={mockedLogin} />
        </Login>);
    })
    it('should match snapshot', () => { 
        const { asFragment } = render(
            <Login>
                <LoginForm login={mockedLogin} />
            </Login>
        )

        expect(asFragment()).toMatchSnapshot();
    })

    it('should call login', async () => { 
        const { user, getByRole, getByLabelText } = setup(
            <Login>
                <LoginForm login={mockedLogin} />
            </Login>
        )

        const usernameField = getByLabelText("username");
        const passwordField = getByLabelText("password");
        await user.type(usernameField, "testUsername");
        await user.type(passwordField, "testPassword");

        const submitBtn = getByRole('button', {name: /Submit/i})
        user.click(submitBtn);
        await waitFor(() => {
            expect(mockedLogin).toHaveBeenCalledWith("testUsername", "testPassword");
            expect(mockedLogin).toHaveBeenCalled();
        })
    })

    it("should not call login if username or password is missing", async () => {
        const { user, getByRole, findByLabelText } = setup(
            <Login>
                <LoginForm login={mockedLogin} />
            </Login>
        )

        const usernameField = await findByLabelText("username");
        const passwordField = await findByLabelText("password");
        await user.type(usernameField, "testUsername");
        await user.type(passwordField, "[Tab]");

        const submitBtn = getByRole('button', {name: /Submit/i})
        
        try{
            await user.click(submitBtn);
        }catch(err: any){
            expect(err).toBeTruthy();
            expect(err.message).toContain("Password is a required field");
        }
    })
})