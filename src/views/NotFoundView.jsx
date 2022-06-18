import React from "react"
import {Link} from "react-router-dom";

export default function NotFoundView() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-500 bg-fixed bg-cover bg-bottom error-bg">
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
                        <div className="relative ">
                            <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
                                404
                            </h1>
                        </div>
                        <h5 className="text-gray-300 font-semibold">
                            這裡是空的
                        </h5>
                        <p className="text-gray-100 mt-2 mb-6">
                            物件不知道跑哪了：可能曾經存在過，也可能不曾存在，就像愛情一樣
                        </p>
                        <Link
                            className="bg-amber-600 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg"
                            to="/"
                        >
                            回家吧
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
