import { NextResponse } from "next/server";
import mockData from "@/app/data/mockData";
import { revalidateTag } from "next/cache";

const sleep = (timer) => {
    return new Promise((resolve) => setTimeout(resolve, timer));
};

export async function GET(request, { params }) {
    const { category } = params;
    const searchParams = new URL(request.url).searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : 10;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page'), 10) : 1;
    let filteredData = category === "todos" ? mockData : mockData.filter(item => item.category.toLowerCase() === category.toLowerCase());
    const start = (page - 1) * limit;
    const end = start + limit;
    
    // Extraer los productos correspondientes a la página actual
    const paginatedData = filteredData.slice(start, end);
    
    await sleep(1000);
    revalidateTag('cart')
    return NextResponse.json(paginatedData);
}