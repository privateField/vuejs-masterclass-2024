<script setup lang="ts">
import { supabase } from "@/utils/supabase"
import { h, ref } from 'vue';
import type { Tables } from "../../../database/types"
import type { ColumnDef } from "@tanstack/vue-table";
import DataTable from "@/components/ui/data-table/DataTable.vue";
import { RouterLink } from "vue-router";

const projects = ref<Tables<'projects'>[] | null>();

(async () => {
  const { data, error } = await supabase.from("projects").select();
  if (error) {
    console.log(error);
  }
  projects.value = data;
})();

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'Id'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('id'))
    }
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(RouterLink, { to: `/projects/${row.original.slug}`, class: 'text-left font-medium hover:bg-muted block w-full' }, () => row.getValue('name'))
    }
  },
  {
    accessorKey: 'slug',
    header: () => h('div', { class: 'text-left' }, 'Slug'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('slug'))
    }
  },
  {
    accessorKey: 'createe_at',
    header: () => h('div', { class: 'text-left' }, 'Created'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('createe_at'))
    }
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    }
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify(row.getValue('collaborators'))
      )
    }
  }
]


</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
