export default class KanbanAPI {
    static getItems(columnId) {
        const column = read().find(column => column.id == columnId)
        //read from local storage, see if we can find the column in the list of columns in our DB. 
        if (!column) { // if it doesn't exist
            return []
        }

        return column.items //return all the items in that column
    }

    static insertItem(columnId, content) {
        const data = read();
        const column = data.find(column => column.id == columnId); //we find the column
        const item = { //create our item structure
            id: Math.floor(Math.random() * 100000), //
            content
        }

        if (!column) {//make sure the column exist
            throw new Error("Column does not exist")
        }

        column.items.push(item) //added the item into that column array
        save(data)//save it

        return item //return the item saved
    }


    static deleteItem(itemId) {
        const data = read()

        for (const column of data) {
            const item = column.items.find(item => item.id = itemId)

            if (item) {
                column.items.splice(column.item.indexOf(item), 1)
            }
        }
        save(data)

    }


}

function read() {
    const json = localStorage.getItem("kanban-data")

    if (!json) {
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            },
            {
                id: 4,
                items: []
            },
        ]
    }
    // nested array of items with few properties
    return JSON.parse(json)
}

function save(data) {
    // local storage save data as strings and when we pull it out, we parse that data as json to use it as anything other than a string
    //When we pass data into our local storage we need to turn it into a string with the built in stringify it
    localStorage.setItem("kanban-data", JSON.stringify(data))

}