import { render } from "@testing-library/react";
import SignupForm from "../SignupForm";

describe("signup form", function(){
    const mockSignup = vi.fn();

    it('should render without crashing', () => { 
        render(<SignupForm signup={mockSignup} />);
    })

    it('should match snapshot', () => { 
        const { asFragment } = render(
            <SignupForm signup={mockSignup} />
        )

        expect(asFragment()).toMatchSnapshot();
    })
})