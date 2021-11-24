def system!(*args)
  system(*args) || abort("\n== Stop webpack ==")
end

namespace :webpack do
    task(:build) do
        puts '== Compile webpack bundles =='
        system! "npm run build --prefix app/javascript" 
    end
  
    task(:start) do
        puts '== Start webpack dev server =='
        system! "npm run start --prefix app/javascript/"
    end

    task(:install) do
        puts '== Install npm packages =='
        system! "npm install --prefix app/javascript"
    end
end