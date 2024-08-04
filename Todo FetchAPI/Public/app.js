const { createApp, ref } = Vue;

const app = createApp({
    data() {
        return {
            inputToDoItem: "",
            todosList: []
        }
    },
    computed: {
        itemsLeft() {
            return this.todosList.filter(todo => !todo.completed).length;
        },
        inputToDoItemValue() {
            return !this.inputToDoItem.trim().length;
        }
    },
    mounted() {
        this.getToDos();
        this.focusInput();
    },
    methods: {
        async getToDos() {
            try {
                const response = await fetch('http://localhost:5000/todos');
                const data = await response.json();
                this.todosList = data.todos;
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        },
        async addItem() {
            if (!this.inputToDoItem.trim().length) return;
            try {
                const response = await fetch('http://localhost:5000/todos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        todo: this.inputToDoItem,
                        completed: false
                    })
                });
                const newTodo = await response.json();
                this.todosList.push(newTodo);
            } catch (error) {
                console.error('Error adding todo:', error);
            }
            this.resetData();
            this.focusInput();
        },
        async removeItem(todoItem) {
            try {
                await fetch(`http://localhost:5000/todos/${todoItem.id}`, { method: 'DELETE' });
                this.todosList = this.todosList.filter(item => item.id !== todoItem.id);
            } catch (error) {
                console.error('Error removing todo:', error);
            }
        },
        resetData() {
            this.inputToDoItem = "";
        },
        focusInput() {
            this.$refs.inputToDoItem.focus();
        }
    }
});

app.mount("#app");
