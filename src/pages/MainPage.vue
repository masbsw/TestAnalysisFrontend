<template>
  <div class="min-h-screen flex flex-col">
    <HeaderSection />
    
    <div class="container mx-auto px-4 py-6 flex flex-1">
      <MenuSlider />
      <ProjectsSection />
    </div>
  </div>
</template>

<script>
import MenuSlider from '@/cross-components/MenuSlider.vue';
import HeaderSection from '@/cross-components/HeaderSection.vue';
import ProjectsSection from '@/components/main/ProjectsSection.vue';


  export default{
    components:{
      HeaderSection,
      MenuSlider,
      ProjectsSection
    }
  }

</script>
  
