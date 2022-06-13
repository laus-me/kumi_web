import React, {useState} from 'react';
import {
    CheckCircleIcon,
    InformationCircleIcon,
    PlusCircleIcon
} from '@heroicons/react/outline';
import EditModal from "../components/EditModal";

function Item(props) {
    const {title, description} = props;
    return (
        <div className="flex px-5 py-3 hover:bg-gray-100">
            <div className="flex-none w-10 mr-5">
                <CheckCircleIcon title="已完成" />
            </div>
            <div className="grow w-64 select-none">
                <div>{title}</div>
                <div>{description}</div>
            </div>
            <div className="flex-none w-10 cursor-pointer" title="詳細資料">
                <InformationCircleIcon title="詳細資料" />
            </div>
        </div>
    )
}

export default function HomeView(props) {
    const {db} = props;
    const [list, setList] = useState([]);

    db.then(async (i) => {
        setList(await i.transaction('items').store.getAll());
    });

    const [openEditModalValue, setOpenEditModalValue] = useState(false);
    const pinList = list.filter((i) => i.enabledPin)

    return (
        <section className="flex-1 pt-3 md:p-6 lg:mb-0 lg:min-h-0 lg:min-w-0">
            <EditModal db={db} open={openEditModalValue} setOpen={setOpenEditModalValue} />
            <div className="flex flex-col lg:flex-row h-full w-full">
                {pinList.length > 0 && (
                    <div className="border pb-2 lg:pb-0 w-full lg:max-w-sm px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap">
                        {pinList.map((i) => (
                            <Item
                                key={i.id}
                                title={i.title}
                                description={i.description}
                            />
                        ))}
                    </div>
                )}
                <div className="border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
                    <div className="bg-white w-full h-full min-h-0 min-w-0 overflow-auto">
                        <div
                            className="flex px-5 py-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => setOpenEditModalValue(true)}
                        >
                            <div className="flex-none w-10 mr-5">
                                <PlusCircleIcon title="新增" />
                            </div>
                            <div className="grow w-64 select-none">
                                <div className="text-black">建立新的提醒事項</div>
                                <div className="text-gray-600">我還能提醒你更多更多 😊</div>
                            </div>
                        </div>
                        {list.map((i) => (
                            <Item
                                key={i.id}
                                title={i.title}
                                description={i.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
