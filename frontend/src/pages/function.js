export  const CalculateMatchScore=(a,b)=>{
  let score=0;
  let criteria=0;
  if(a.college && b.college){
    criteria++;
    if(a.college.toLowerCase()==b.college.toLowerCase()){
      score++;

    }
  }
  if(a.sleepPatter && b.sleepPatter){
    criteria++;
    if(a.sleepPatter==b.sleepPatter){
      score++;
    }
  }
  if(a.studyHabits && b.studyHabits){
    criteria++;
    if(a.studyHabits==b.studyHabits){
      score++;
    }
  }
  if(a.cleanliness && b.cleanliness){
    criteria++;
    if(a.cleanliness==b.cleanliness){
      score++;
    }
  }
  if(a.noiseTolerance && b.noiseTolerance){
    criteria++;
    if(a.noiseTolerance==b.noiseTolerance){
      score++;
    }
  }
  if(a.smoking && b.smoking){
    criteria++;
    if(a.smoking==b.smoking){
      score++;
    }
  }
  if(a.drinking && b.drinking){
    criteria++;
    if(a.drinking==b.drinking){
      score++;
    }
  }
  if(Array.isArray(a.hobbies) && Array.isArray(b.hobbies)){
    criteria++;
    let commonHobbies=0;
    a.hobbies.forEach((hobby)=>{
      if(b.hobbies.includes(hobby)){
        commonHobbies++;
      }
    })
    if(commonHobbies>0)score++;
  }
  if(criteria==0)return 0;
  return Math.round(score/criteria*100);
}

