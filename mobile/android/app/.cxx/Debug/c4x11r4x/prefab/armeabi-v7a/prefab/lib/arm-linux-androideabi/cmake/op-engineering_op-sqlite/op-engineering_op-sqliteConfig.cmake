if(NOT TARGET op-engineering_op-sqlite::op-sqlite)
add_library(op-engineering_op-sqlite::op-sqlite SHARED IMPORTED)
set_target_properties(op-engineering_op-sqlite::op-sqlite PROPERTIES
    IMPORTED_LOCATION "/Users/okihita/ArcaneSanctum/ARM-AI-Hackathon/mobile/node_modules/@op-engineering/op-sqlite/android/build/intermediates/cxx/Debug/5d275h54/obj/armeabi-v7a/libop-sqlite.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/okihita/ArcaneSanctum/ARM-AI-Hackathon/mobile/node_modules/@op-engineering/op-sqlite/android/build/headers/op-sqlite"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

