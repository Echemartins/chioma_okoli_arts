// Artist-supplied images. These are archive labels, not confirmed artwork titles.
export const evaWorks=[
  {slug:"eva-study-01",title:"EVA foam study 01",image:"/eva/eva-01-red-figure.jpg",alt:"A reclining red figure built from layered EVA foam against a deep red background."},
  {slug:"eva-study-02",title:"EVA foam study 02",image:"/eva/eva-02-purple-figure.jpg",alt:"A reclining figure in pink and dark foam beside turquoise, on a purple layered background."},
  {slug:"eva-study-03",title:"EVA foam study 03",image:"/eva/eva-03-colour-study.jpg",alt:"A square arrangement of yellow, purple, turquoise, blue, pink and green foam pieces on a pale surface."},
  {slug:"eva-study-04",title:"EVA foam study 04",image:"/eva/eva-04-colour-study.jpg",alt:"A vertical arrangement of blue, yellow, purple and turquoise foam blocks on a pale surface."},
  {slug:"eva-study-05",title:"EVA foam study 05",image:"/eva/eva-05-yellow-composition.jpg",alt:"Two figures assembled in layered coloured foam against a bright yellow background."},
].map((work,index)=>({...work,description:work.alt+" Working archive label; artist title, date and dimensions await confirmation.",medium:"EVA foam",category:"Mixed Media",theme:"Material & environment",isEva:true,isSelected:false,isFeatured:false,sortOrder:100+index}));
