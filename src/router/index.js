import {createRouter, createWebHistory} from "vue-router";
import Body from "@/components/Body";
import Login from "@/components/Login";
// import Books from "@/components/books/Books";
import BooksAdmin from "@/components/books/BooksAdmin";
import Book from "@/components/books/Book";
import BookEdit from "@/components/books/BookEdit";
import Users from "@/components/users/Users";
import UserEdit from "@/components/users/UserEdit";
import Security from "@/components/security";
import BooksComposition from "@/components/books/BooksComposition";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Body,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/books',
        name: 'Books',
        // component: Books,
        component: BooksComposition
    },
    {
        path: '/books/:bookName',
        name: 'Book',
        component: Book,
    },
    {
        path: '/admin/books',
        name: 'BooksAdmin',
        component: BooksAdmin,
    },
    {
        path: '/admin/books/:bookId',
        name: 'BookEdit',
        component: BookEdit,
    },
    {
        path: '/admin/users',
        name: 'Users',
        component: Users,
    },
    {
        path: '/admin/users/:userId',
        name: 'User',
        component: UserEdit,
    },
]

const router = createRouter({history: createWebHistory(), routes})
router.beforeEach(() => {
    Security.checkToken()
})
export default router