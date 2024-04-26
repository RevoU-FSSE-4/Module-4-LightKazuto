import { useState } from "react";
import { Category } from "../type/category";

export default function CreatCategoryComponent(props: { onSubmit: (value: Category) => void }) {
    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryDesc, setCategoryDesc] = useState<string>("");

    async function onSubmitCategory(event: any) {
        event.preventDefault();

        const categoryData: Category = {
            id: "",
            category_name: categoryName,
            category_description: categoryDesc,
            is_active: true
        };
        props.onSubmit(categoryData);
        await createCategory(categoryData);
    }

    async function createCategory(data: Category) {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': "Application/json",
                'Authorization': "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "category_name": data.category_name,
                "category_description": data.category_description,
                "is_active": true
            })
        };

        try {
            const response = await fetch('https://library-crud-sample.vercel.app/api/category/create', options);
            if (!response.ok) {
                throw new Error('Failed to create category');
            }
            setTimeout(() => {
                alert("create process success");
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmitCategory}>
                <h1>Create New Category</h1>
                <div>
                    <input 
                        className=""
                        onChange={(e) => setCategoryName(e.target.value)}
                        type="text"
                        placeholder="Enter Category Name" 
                    />
                    <input 
                        onChange={(e) => setCategoryDesc(e.target.value)}
                        type="text"
                        placeholder="Enter Category Description" 
                    />
                    <button type="submit">
                        Add Category
                    </button>
                </div>
            </form>
        </div>
    );
}


