<template>
    <div class="card">
        <DataTable v-model:filters="filters" v-model:selection="selectedCustomer" :value="tableData" stateStorage="session"
            stateKey="dt-state-demo-session" paginator :rows="5" filterDisplay="menu" selectionMode="single" dataKey="id"
            paginatorTemplate="FirstPageLink   PageLinks  LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]" :pageLinkSize="3" removableSort
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} roles"
            :globalFilterFields="['name', 'country.name', 'representative.name', 'status']" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap justify-between items-center gap-3">
                    <h3 class="flex-none">Roles List</h3>
                    <div class="flex flex-row ">
                        <InputText class="flex-initial mr-4 w-48" v-model="filters['global'].value" placeholder="Search Role">
                        </InputText>
                        <Button label="Add Role" @click="showRoles"
                            class="flex-initial w-44 active:bg-primary-700 
                                 hover:bg-primary-800 focus:outline-none 
                                 bg-primary border-primary 
                                " />
                    </div>
                </div>

            </template>
            <template v-for="column in columns" :key="column.field">
                <Column v-if="!column.actionColumn" :field="column.field" :header="column.header" :sortable="column.sortable" :style="column.style">
                </Column>
                <Column v-else-if="column.actionColumn" :key="column.field" :header="column.header" :style="column.style">
                    <template #body="{ data }">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2 text-primary border-primary-200"
                            @click="editProduct(data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(data)" />
                    </template>
                </Column>
            </template>
            <!-- <Column field="id" header="ID" sortable style="width: 25%">

            </Column>
            <Column field="name" header="Name" sortable style="width: 25%">

            </Column>
            <Column header="Action" style="width: 25%">
                <template #body="{ data }">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2 text-primary border-primary-200"
                        @click="editProduct(data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(data)" />
                </template>
            </Column> -->

            <template #empty> No customers found. </template>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useDialog } from 'primevue/usedialog';
import { useToast } from 'primevue/usetoast';
const props = defineProps({
    tableData: {
        type: Array,
        required: true,
    },
    headerName:{
        type: String,
        required:true
    },
    columns: {
        type: Array,
        required: true
    },
    rolesList: {
        type: Object,
        required: true
    }
});
const dialog = useDialog();
const toast = useToast();

const filters = ref(
    {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    }
);


const showRoles = () => {
    console.log('show', dialog)
    const dialogRef = dialog.open(props.rolesList, {
        props: {
            header: props.headerName,
            style: {
                width: '900px',
                height: '900px',

            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            modal: true
        },
        onClose: (options) => {
            console.log('dialog',options)
            const data = options.data;
            if (data) {
                const buttonType = data.buttonType;
                const summary_and_detail = buttonType === 'Cancel' ? { severity:'error', summary: 'No Role Selected', detail: `Pressed '${buttonType}' button` } : {severity:'info', summary: 'Role Selected', detail: data.name };
                toast.add({ ...summary_and_detail, life: 3000 });
            }
        }
    });
}
const editProduct = (prod) => {
    // product.value = {...prod};
    // productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    // product.value = prod;
    // deleteProductDialog.value = true;
};
</script>

<style lang="css" scoped></style>