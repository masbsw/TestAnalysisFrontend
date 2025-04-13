<template>
    <div class="min-h-screen flex flex-col">
      <HeaderSection />
      
      <div class="container mx-auto px-4 py-6 flex flex-1">
        <MenuSlider />
        <SettingsSection />
      </div>
    </div>
  </template>
  
  <script>
import SettingsSection from '@/components/settings/SettingsSection.vue';
import HeaderSection from '@/cross-components/HeaderSection.vue';
  import MenuSlider from '@/cross-components/MenuSlider.vue';
  
  
      export default{
          components:{
              MenuSlider,
              HeaderSection,
              SettingsSection
          }
      }
  
  </script>