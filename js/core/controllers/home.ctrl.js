app.controller('homeCtrl', ['$scope', '$location', 'firebaseService', function($scope, $location,firebaseService) {
    
    var members = [
        {"Grade_Basis": "Standard", "Name": "Billone,Matthew T", "Level": "Sophomore", "Program_and_Plan": "Engineering - Computer Engineering BCPE", "Email_Address": "mbillone@udel.edu", "Units": "1", "ID": "702354103"}
        ,{"Grade_Basis": "Standard", "Name": "Faulkenberry,Stephen Thomas", "Level": "Senior", "Program_and_Plan": "Engineering - Biomedical Engineering BBE/Bioelectrical Engineering/Computer Science/Electrical & Computer Engineer", "Email_Address": "stfberry@udel.edu", "Units": "1", "ID": "701948730"}
        ,{"Grade_Basis": "Standard", "Name": "Garcia Jr,Gerson Jonathan", "Level": "Senior", "Program_and_Plan": "Engineering - Electrical Engineering BEE", "Email_Address": "jgarcia@udel.edu", "Units": "2", "ID": "701395176"}
        ,{"Grade_Basis": "Standard", "Name": "Jorss,Jackson Karl", "Level": "Junior", "Program_and_Plan": "Arts and Sciences - Cognitive Science BS/Computer Science/Electrical & Computer Engineer", "Email_Address": "jorss@udel.edu", "Units": "2", "ID": "701548242"}
        ,{"Grade_Basis": "Standard", "Name": "Lort,Gregory Owen", "Level": "Senior", "Program_and_Plan": "Engineering - Electrical Engineering BEE", "Email_Address": "glort@udel.edu", "Units": "2", "ID": "702009753"}
        ,{"Grade_Basis": "Standard", "Name": "Lu,Jingcheng", "Level": "Senior", "Program_and_Plan": "Engineering - Electrical Engineering BEE/Honors/Mathematics", "Email_Address": "ariclu@udel.edu", "Units": "2", "ID": "701976994"}
        ,{"Grade_Basis": "Standard", "Name": "Mason,Naiim", "Level": "Senior", "Program_and_Plan": "Arts and Sciences - Linguistics BA/Cognitive Science BS/4+1 Joint Bachelor and Master", "Email_Address": "naiim@udel.edu", "Units": "2", "ID": "701765393"}
        ,{"Grade_Basis": "Standard", "Name": "Matimu,Michael H", "Level": "Senior", "Program_and_Plan": "Engineering - Electrical Engineering BEE", "Email_Address": "mmatimu@udel.edu", "Units": "2", "ID": "701490754"}
        ,{"Grade_Basis": "Standard", "Name": "Qiao,Chu", "Level": "Junior", "Program_and_Plan": "Engineering - Computer Engineering BCPE/Computer Science", "Email_Address": "qiaochu@udel.edu", "Units": "1", "ID": "702265456"}
        ,{"Grade_Basis": "Standard", "Name": "Ryan,Conor James", "Level": "Senior", "Program_and_Plan": "Engineering - Electrical Engineering BEE", "Email_Address": "cjryan@udel.edu", "Units": "2", "ID": "702020636"}
        ,{"Grade_Basis": "Standard", "Name": "Seda,Mark Phillip", "Level": "Sophomore", "Program_and_Plan": "Engineering - Computer Engineering BCPE/Computer Science/Honors", "Email_Address": "mseda@udel.edu", "Units": "1", "ID": "702212523"}
        ,{"Grade_Basis": "Standard", "Name": "Sharma,Akash", "Level": "Sophomore", "Program_and_Plan": "Engineering - Electrical Engineering BEE/Computer Science", "Email_Address": "aksharma@udel.edu", "Units": "2", "ID": "702282265"}
        ,{"Grade_Basis": "Standard", "Name": "Wang,Qile", "Level": "Junior", "Program_and_Plan": "Arts and Sciences - Mathematics and Economics BS/Art/Computer Science", "Email_Address": "kylewang@udel.edu", "Units": "1", "ID": "702040235"}
        ,{"Grade_Basis": "Standard", "Name": "Williams,Joshua Ryan", "Level": "Sophomore", "Program_and_Plan": "Engineering - Electrical Engineering BEE/Honors", "Email_Address": "joshrw@udel.edu", "Units": "1", "ID": "702327335"}
        ,{"Grade_Basis": "Standard", "Name": "Betters,Mark Nathan", "Level": "Senior", "Program_and_Plan": "Engineering - Computer Engineering BCPE/Computer Science", "Email_Address": "mbetters@udel.edu", "Units": "1", "ID": "701765071"}
        ,{"Grade_Basis": "Standard", "Name": "Brady,Carlton Thomas", "Level": "Senior", "Program_and_Plan": "Engineering - Computer Engineering BCPE/Mathematics", "Email_Address": "ctbrady@udel.edu", "Units": "1", "ID": "701765508"}
        ,{"Grade_Basis": "Standard", "Name": "Bubel,Christopher S", "Level": "Senior", "Program_and_Plan": "Engineering - Computer Science BS/Honors", "Email_Address": "cbubel@udel.edu", "Units": "3", "ID": "701899548"}
        ,{"Grade_Basis": "Standard", "Name": "Chang,Jonathan J", "Level": "Sophomore", "Program_and_Plan": "Engineering - Computer Engineering BCPE/Cybersecurity/Honors", "Email_Address": "jjxc@udel.edu", "Units": "1", "ID": "702277603"}
        ,{"Grade_Basis": "Standard", "Name": "Clark,Benjamin Buckey", "Level": "Senior", "Program_and_Plan": "Arts and Sciences - Mathematics BS/Computer Science/Honors", "Email_Address": "benclark@udel.edu", "Units": "2", "ID": "702050986"}
        ,{"Grade_Basis": "Standard", "Name": "Dorsch,Michael Edward", "Level": "Senior", "Program_and_Plan": "Arts and Sciences - Mathematics BS/Computer Science/Honors", "Email_Address": "mdorsch@udel.edu", "Units": "1", "ID": "702112308"}
        ,{"Grade_Basis": "Standard", "Name": "Geron-Neubauer,David", "Level": "Junior", "Program_and_Plan": "Engineering - Computer Science BS/Cybersecurity", "Email_Address": "davidgn@udel.edu", "Units": "1", "ID": "702110315"}
        ,{"Grade_Basis": "Standard", "Name": "Gouert,Charles Henry", "Level": "Junior", "Program_and_Plan": "Engineering - Computer Engineering BCPE", "Email_Address": "cgouert@udel.edu", "Units": "1", "ID": "702038732"}
        ,{"Grade_Basis": "Standard", "Name": "Hahn,Hyung Jun", "Level": "Sophomore", "Program_and_Plan": "Engineering - Computer Engineering BCPE/Computer Science/Honors", "Email_Address": "coreymu@udel.edu", "Units": "2", "ID": "702217706"}
        ,{"Grade_Basis": "Standard", "Name": "Kong,Dehu", "Level": "Senior", "Program_and_Plan": "Arts and Sciences - Mathematics BS/Computer Science", "Email_Address": "kongdehu@udel.edu", "Units": "1", "ID": "702001439"}
        ,{"Grade_Basis": "Standard", "Name": "McConomy,Jacob William", "Level": "Junior", "Program_and_Plan": "Engineering - Computer Science BS", "Email_Address": "jacobmcc@udel.edu", "Units": "1", "ID": "702226678"}
        ,{"Grade_Basis": "Standard", "Name": "McNeil,Emily Ann", "Level": "Senior", "Program_and_Plan": "Engineering - Computer Science BS", "Email_Address": "mcneilea@udel.edu", "Units": "1", "ID": "702214542"}
        ,{"Grade_Basis": "Standard", "Name": "Meyer,Keith", "Level": "Sophomore", "Program_and_Plan": "Engineering - Mechanical Engineering BME", "Email_Address": "kmeyer@udel.edu", "Units": "1", "ID": "702289245"}
        ,{"Grade_Basis": "Standard", "Name": "Moores,Christopher David", "Level": "Junior", "Program_and_Plan": "Engineering - Computer Science BS", "Email_Address": "cmoores@udel.edu", "Units": "1", "ID": "701977469"}
        ,{"Grade_Basis": "Standard", "Name": "Paramesh,Naveen", "Level": "Junior", "Program_and_Plan": "Engineering - Computer Science BS", "Email_Address": "npara@udel.edu", "Units": "2", "ID": "701977003"}
        ,{"Grade_Basis": "Standard", "Name": "Rinaldi,Thomas Jesse", "Level": "Junior", "Program_and_Plan": "Business and Economics - Management Info Systems BS/Computer Science", "Email_Address": "jrinaldi@udel.edu", "Units": "1", "ID": "702219366"}
        ,{"Grade_Basis": "Standard", "Name": "Roberts Jr,John Michael", "Level": "Junior", "Program_and_Plan": "Business and Economics - Management Info Systems BS/Operations Management BS", "Email_Address": "jmrobert@udel.edu", "Units": "1", "ID": "702245213"}
        ,{"Grade_Basis": "Standard", "Name": "Shafique,Saad", "Level": "Sophomore", "Program_and_Plan": "University Studies - University Studies", "Email_Address": "sshafiq@udel.edu", "Units": "2", "ID": "702226714"}
        ,{"Grade_Basis": "Standard", "Name": "Swalm,Connor Jaydon", "Level": "Junior", "Program_and_Plan": "Arts and Sciences - Mathematics BS/Computer Science", "Email_Address": "cswalm@udel.edu", "Units": "2", "ID": "702050606"}
        ,{"Grade_Basis": "Standard", "Name": "Walker,Nathan Augustus", "Level": "Junior", "Program_and_Plan": "Engineering - Electrical Engineering BEE", "Email_Address": "nwalkeh@udel.edu", "Units": "2", "ID": "702124455"}
        ,{"Grade_Basis": "Standard", "Name": "Wallace,Daulton Gregory", "Level": "Junior", "Program_and_Plan": "Engineering - Mechanical Engineering BME/Theatre Studies", "Email_Address": "dwall@udel.edu", "Units": "1", "ID": "701977771"}
        ,{"Grade_Basis": "Standard", "Name": "Wittreich,Christof Francis", "Level": "Sophomore", "Program_and_Plan": "Engineering - Computer Science BS", "Email_Address": "wittrecf@udel.edu", "Units": "1", "ID": "702211884"}
        ,{"Grade_Basis": "Standard", "Name": "Wood,Jonathan Paul", "Level": "Junior", "Program_and_Plan": "Business and Economics - Economics BS/Honors", "Email_Address": "jpwood@udel.edu", "Units": "1", "ID": "702347668"}
        ,{"Grade_Basis": "Standard", "Name": "Zingo,Pasquale A", "Level": "Senior", "Program_and_Plan": "Arts and Sciences - Applied Mathematics BS/Computer Science", "Email_Address": "patzingo@udel.edu", "Units": "1", "ID": "701765579"}
        ,{"Grade_Basis": "Standard", "Name": "Campbell,Casey Kevan", "Level": "Senior", "Program_and_Plan": "Engineering - Electrical Engineering BEE/Honors", "Email_Address": "ckcamp@udel.edu", "Units": "3", "ID": "702011792"}
        ,{"Grade_Basis": "Standard", "Name": "Chann,Jonathon Michael", "Level": "Junior", "Program_and_Plan": "Engineering - Electrical Engineering BEE", "Email_Address": "jchann@udel.edu", "Units": "1", "ID": "702054274"}
        ,{"Grade_Basis": "Standard", "Name": "Deputy,Alexis Marissa", "Level": "Junior", "Program_and_Plan": "Engineering - Electrical Engineering BEE", "Email_Address": "adeputy@udel.edu", "Units": "1", "ID": "702266251"}
        ,{"Grade_Basis": "Standard", "Name": "Esteves,William Franklin", "Level": "Sophomore", "Program_and_Plan": "Engineering - Electrical Engineering BEE", "Email_Address": "westeves@udel.edu", "Units": "2", "ID": "702289091"}
        ,{"Grade_Basis": "Standard", "Name": "Fierro,Vincent James", "Level": "Senior", "Program_and_Plan": "Engineering - Electrical Engineering BEE", "Email_Address": "vfierro@udel.edu", "Units": "1", "ID": "701025549"}
        ,{"Grade_Basis": "Standard", "Name": "Flaquer,Jael Alejandro", "Level": "Senior", "Program_and_Plan": "Engineering - Computer Engineering BCPE", "Email_Address": "jflaquer@udel.edu", "Units": "1", "ID": "701490798"}
        ,{"Grade_Basis": "Standard", "Name": "Hall,Kemba Ashley", "Level": "Junior", "Program_and_Plan": "Engineering - Electrical Engineering BEE", "Email_Address": "kembah@udel.edu", "Units": "1", "ID": "701969025"}
        ,{"Grade_Basis": "Standard", "Name": "Ndingwan,Awah-Moutan", "Level": "Junior", "Program_and_Plan": "Engineering - Computer Engineering BCPE", "Email_Address": "awahndin@udel.edu", "Units": "2", "ID": "701842027"}
        ,{"Grade_Basis": "Standard", "Name": "Neuburger,Daniel Ross", "Level": "Sophomore", "Program_and_Plan": "Engineering - Computer Engineering BCPE/Cybersecurity/Entrepreneurial Studies", "Email_Address": "drn@udel.edu", "Units": "2", "ID": "702344453"}
        ,{"Grade_Basis": "Standard", "Name": "Rutkowski,Johnathan Paul", "Level": "Senior", "Program_and_Plan": "Engineering - Computer Engineering BCPE", "Email_Address": "johnnypr@udel.edu", "Units": "1", "ID": "48792"}
        ,{"Grade_Basis": "Standard", "Name": "Smith,Jacob Charles", "Level": "Junior", "Program_and_Plan": "Engineering - Computer Engineering BCPE", "Email_Address": "jakesmit@udel.edu", "Units": "2", "ID": "701977001"}
        ,{"Grade_Basis": "Standard", "Name": "Stacy,Brandon James", "Level": "Junior", "Program_and_Plan": "Engineering - Electrical Engineering BEE/Sustainable Energy Technology", "Email_Address": "bstac@udel.edu", "Units": "1", "ID": "702036082"}
        ,{"Grade_Basis": "Standard", "Name": "Stoup,Jolyne Elizabeth Ann", "Level": "Sophomore", "Program_and_Plan": "Engineering - Electrical Engineering BEE/Computer Science", "Email_Address": "jstoup@udel.edu", "Units": "1", "ID": "702299537"}
        ,{"Grade_Basis": "Standard", "Name": "Weber,Robert Anthony", "Level": "Senior", "Program_and_Plan": "Engineering - Computer Science BS", "Email_Address": "rcweber@udel.edu", "Units": "1", "ID": "701845314"}

    ]
    $scope.pushJson = function(){
        for(var i = 0; i < members.length; i++){
            firebaseService.pushDataWithUniqueID('/Students/', members[i]);
        }
    }
}]);