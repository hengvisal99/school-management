<template>
    <div class="flex flex-col ">

        <form @submit.prevent="submitForm">
            <div class="p-4 flex gap-3 flex-col">
                <div class="flex flex-row gap-8">
                    <div class="flex flex-col gap-2 w-1/2">
                        <label for="username">Permission Code</label>
                        <InputText id="username" v-model="formData.code" />
                    </div>
                    <div class="flex flex-col gap-2 w-1/2">
                        <label for="username">Permission Name</label>
                        <InputText id="username" v-model="formData.name" />
                    </div>
                </div>

                <div class="flex gap-2 justify-center mt-6">
                    <Button label="Cancel" severity="danger" @click="actionButtonDialog({ buttonType: 'Cancel' })" />
                    <Button type="submit" label="Submit" @click="actionButtonDialog({ buttonType: 'Submit' })"
                        class="button-primary" />
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useToast } from 'primevue/usetoast';
import userApi from '@/api/route/users';
const dialogRef = inject("dialogRef");
const toast = useToast();
const patchForm = ref(null)
const formData = ref({
    id: '',
    code: '',
    name: '',
});
const isEdit = ref(false)
const actionButtonDialog = async (e) => {
    const button = e.buttonType;
    
    if (button === 'Submit') {
        if (formData.value.code === '' || formData.value.name === '') {
            showToast('error', 'Error Message', 'Please Input Code or Name');
            return;
        }

        const payloadData = {
            code: formData.value.code,
            name: formData.value.name
        };

        if (isEdit.value) {
            payloadData.id = formData.value.id;
            try {
                await updatePermission(payloadData);
            } catch (error) {
                handleRequestError(error);
                return;
            }
        } else {
            try {
                await createPermission(payloadData);
            } catch (error) {
                handleRequestError(error);
                return;
            }
        }
    }

    dialogRef.value.close(e);
};

const createPermission = async (payload) => {
    const { data, error } = await userApi.createPermission(payload);
    if (error) {
        throw new Error(error); // Throw error if there is an error
    }
};


const updatePermission = async (payload) => {
    const {data,error} = await userApi.updatePermission(payload);
    if (error) {
        throw new Error(error); // Throw error if there is an error
    }
};


const showToast = (severity, summary, detail) => {
    toast.add({ severity, summary, detail, life: 3000 });
};

const handleRequestError = (error) => {
    showToast('error', 'Error Message', 'Fail request');
    console.error('Error creating permission:', error);
    return
};

onMounted(() => {
    const dialog = dialogRef?.value?.data
    patchForm.value = dialog.permissions?.data
    isEdit.value =  dialog.isEdit
    if (isEdit.value) {
        formData.value = {
            id: patchForm?.value?.id,
            code: patchForm?.value?.code,
            name: patchForm?.value?.name,
        };
    }

});
</script>

<style lang="css" scoped>
td {
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>
