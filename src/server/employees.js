import { Model, createServer } from "miragejs"

export function initMirageServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,
    models: {
      employee: Model,
    },
  
    routes() {
      this.namespace = "api/employees"
  
      this.get("/", (schema, request) => {
        return schema.employees.all()
      })

      this.get('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.employees.find(id);
      });
      this.post('/', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.employees.create(attrs);
      });
      this.patch('/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let note = schema.employees.find(id);
        return note.update(newAttrs);
      });
      this.delete('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.employees.find(id).destroy();
      });
    },
  
    seeds(server) {
      server.create("employee", { id: "7", name: "Ryan Howard", designation: "Vice President", team: "Leadership", managerID: "0" })
      server.create("employee", { id: "12", name: "Michael Scott", designation: "Regional Manager", team: "Leadership", managerID: "7" })
      server.create("employee", { id: "11", name: "Toby", designation: "HR Manager", team: "Leadership", managerID: "7" }) //12
      server.create("employee", { id: "20", name: "Dwight K. Schrute", designation: "Assistant Regional Manager", team: "Leadership", managerID: "12" })
      server.create("employee", { id: "21", name: "Jim Halpert", designation: "Assistant Regional Manager", team: "Leadership", managerID: "12" })
      server.create("employee", { id: "25", name: "Angela Martin", designation: "Senior Accountant", team: "Accounting", managerID: "12" })
      server.create("employee", { id: "15", name: "Kevin Malone", designation: "Accountant", team: "Accounting", managerID: "25" })
      server.create("employee", { id: "16", name: "Oscar Martinez", designation: "Accountant", team: "Accounting", managerID: "25" })
      server.create("employee", { id: "17", name: "Tom Peets", designation: "Accountant", team: "Accounting", managerID: "25" })
    //   server.create("employee", { id: "11", name: "Toby", designation: "HR Manager", team: "Leadership", managerID: "7" })
    },
    
  });
  return server;
}