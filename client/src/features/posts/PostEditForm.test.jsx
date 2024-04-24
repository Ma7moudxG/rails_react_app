import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fetchPost, updatePost } from '../../services/postsService';
import { act } from 'react-dom/test-utils';
import  EditPostForm from './EditPostForm';

jest.mock("../../services/postsService", () => ({
    fetchPost: jest.fn(),
    updatePost: jest.fn(),
}));

describe("EditPostForm component", () => {
    const mockPost = { 
        title: "Original Post Title", 
        body: "Original Post Body" 
    };

    const renderForm = () => {
        render(
            <MemoryRouter initialEntries={["/posts/1/edit"]}>
                <Routes>
                    <Route path="/posts/:id/edit" element={<EditPostForm />} />
                    <Route path="/posts/:id" element={<h1>Post Detail </h1>} />
                </Routes>
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        fetchPost.mockResolvedValue(mockPost);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it ("should render the EditPostForm component", async () => {
        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        expect (screen.getByDisplayValue(mockPost.title)).toBeInTheDocument();
        expect (screen.getByDisplayValue(mockPost.body)).toBeInTheDocument();
    });

    it ("successfully updates the post and redirects" , async () => {
        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        const updatedPost = {
            title: "Updated Post Title",
            body: "Updated Post Body",
        };

        fireEvent.change(screen.getByLabelText(/Title/i), {
            target: { value: updatedPost.title },
        });

        fireEvent.change(screen.getByLabelText(/Body/i), {
            target: { value: updatedPost.body },
        });

        await act(async () => {
            fireEvent.click(screen.getByText(/Update Post/i));
        });
        
        await waitFor(() => {
            expect(updatePost).toHaveBeenCalledTimes(1);
            expect(updatePost).toHaveBeenCalledWith("1", updatedPost);
        });

        expect(screen.getByText("Post Detail")).toBeInTheDocument();
    });

    it ("shows a console error on update failure", async () => {
        updatePost.mockRejectedValueOnce(new Error("Failed updating post"));
        
        
        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());
        
        renderForm();
        
        await waitFor(() => {
            fireEvent.click(screen.getByText(/Update Post/i));
        });

        updatePost.mockRejectedValueOnce(new Error("Failed updating post"));

        await act(async () => {
            fireEvent.click(screen.getByText(/Update Post/i));
        });

        await waitFor(() => {
            expect(updatePost).toHaveBeenCalledTimes(2);
        });

        expect(consoleSpy).toHaveBeenCalledWith("Failed updating post",
        Error("Failed updating post")
        );
    });

    it ("handles error when fetching the post", async () => {
        fetchPost.mockRejectedValueOnce(new Error("Failed fetching post"));

        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        expect(consoleSpy).toHaveBeenCalledWith("Error fetching post",
        Error("Failed fetching post")
        );
    });
});