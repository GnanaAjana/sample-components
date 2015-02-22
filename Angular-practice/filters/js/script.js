var student=angular.module("studentapp",[]);
	 student.controller("studentController",function($scope){				
			$scope.student={
					title:"Student Details",
					firstName:"John",
					lastName:"Doe",					
					fullName:function(){
						return $scope.student.firstName+" "+$scope.student.lastName;
					},
					gender:"Male",
					email:"john-doe@gmail.com",
					phoneNo:"9983192020",
					subjects:
							[
								{mark:70,subName:'Language-Tamil'},
								{mark:75,subName:'Language-English'},
								{mark:99,subName:'Maths'},
								{mark:80,subName:'Science'},
								{mark:88,subName:'Social'}
							]
				}							
	});