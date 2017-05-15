# mobileFlax
Flaxpro

## Install
npm install

## Run
ios: react-native link && react-native run-ios 
OR 
android: react-native link && react-native run-android


## Installation Errors/Solutions

    //Error after running react-native run-ios
     ld: library not found for -lAirMaps
	 clang: error: linker command failed with exit code 1 (use -v to see invocation)

    //Solution
    in Xcode open libraries -> right click AirMaps.xcodeproj -> add file to AirMaps -> go to find react-native-maps into node_module -> lib -> ios -> AirMaps -> select RCTConvert+MapKit.h/m -> add (to fix 'File RCTConvert+MapKit.m not found').

    //Error in the react package manager
	Failed to build DependencyGraph: @providesModule naming collision: Duplicate module name: react-native-vector-icons ... 
	This error is caused by a @providesModule declaration with the same name across two different files..
     Error: @providesModule naming collision:
     Duplicate module name: react-native-vector-icons...
	 This error is caused by a @providesModule declaration with the same name across two different files.
    at HasteMap._updateHasteMap
	
	 //Solution
	 npm install react-native-router-flux@3.38.0 --save
