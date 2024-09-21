import { render } from "@testing-library/react"
import NavBar from "../components/NavBar";
import UserContext from "../components/contexts/userContext";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { IUser } from "../types";

describe("NavBar Component", function(){ 
    const mockedLogout = vi.fn();    
    
    it('should render', () => { 
        render(
            <MemoryRouter>
                <NavBar logout={mockedLogout} />
            </MemoryRouter>
    );
    })

    it('should match snapshot of no logged-in user', () => { 
        const { asFragment } = render(
            <MemoryRouter>
                <NavBar logout={mockedLogout} />
            </MemoryRouter>
        )
        expect(asFragment()).toMatchSnapshot();
    })

    it('should match snapshot of logged-in user', () => {
        const testUser:IUser = {
            username: "testUser", 
            id: 1,
            firstName: "test",
            lastName: "user",
            email: "test@user"
        }
        
        const { asFragment, getByText } = render(
            <MemoryRouter>
                <UserContext.Provider value={testUser}>
                    <NavBar currUserToken="fakeToken" logout={mockedLogout} />
                </UserContext.Provider>
            </MemoryRouter>
        )
        expect(asFragment()).toMatchSnapshot();
        expect(getByText("testUser")).toBeInTheDocument();
        expect(getByText("Logout")).toBeInTheDocument();
    })

    it('should call logout', async () => { 
        const testUser:IUser = {
            username: "testUser", 
            id: 1,
            firstName: "test",
            lastName: "user",
            email: "test@user"
        }

        const user = userEvent.setup();

        const { getByText } = render(
            <MemoryRouter>
                <UserContext.Provider value={testUser}>
                    <NavBar currUserToken="fakeToken" logout={mockedLogout} />
                </UserContext.Provider>
            </MemoryRouter>
        )

        const logoutBtn = getByText("Logout");
        await user.click(logoutBtn);
        expect(mockedLogout).toHaveBeenCalled();
    })
})